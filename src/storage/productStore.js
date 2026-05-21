'use strict';
class ProductStore {
  constructor() {
    /** @type {Map<string, { id: string, name: string, sku: string, created_at: string }>} */
    this._metadata = new Map();

    /** @type {Map<string, { image_urls: string[], video_urls: string[] }>} */
    this._media = new Map();

    /** @type {Map<string, string>} SKU -> productId */
    this._skuIndex = new Map();
  }

  hasSku(sku) {
    return this._skuIndex.has(sku);
  }

  create(product) {
    const { id, name, sku, image_urls, video_urls, created_at } = product;

    this._metadata.set(id, { id, name, sku, created_at });
    this._media.set(id, { image_urls: [...image_urls], video_urls: [...video_urls] });
    this._skuIndex.set(sku, id);
  }

  getMetadataById(id) {
    return this._metadata.get(id) || null;
  }

  getMediaById(id) {
    return this._media.get(id) || null;
  }

  exists(id) {
    return this._metadata.has(id);
  }

  /**
   * Paginated listing — returns ONLY metadata with media counts.
   * Never touches the media Map, so serialization stays lightweight
   * regardless of how many URLs each product has.
   */
  list(limit, offset) {
    const entries = Array.from(this._metadata.values());
    const total = entries.length;
    const page = entries.slice(offset, offset + limit);

    const items = page.map(meta => {
      const media = this._media.get(meta.id);
      return {
        id: meta.id,
        name: meta.name,
        sku: meta.sku,
        image_count: media ? media.image_urls.length : 0,
        video_count: media ? media.video_urls.length : 0,
        thumbnail_url: media && media.image_urls.length > 0 ? media.image_urls[0] : null,
        created_at: meta.created_at,
      };
    });

    return { items, total };
  }

  /**
   * Full detail view — merges metadata + media for a single product.
   */
  getFullProduct(id) {
    const meta = this._metadata.get(id);
    if (!meta) return null;

    const media = this._media.get(id);
    return {
      ...meta,
      image_urls: media ? [...media.image_urls] : [],
      video_urls: media ? [...media.video_urls] : [],
    };
  }

  appendMedia(id, imageUrls = [], videoUrls = []) {
    const media = this._media.get(id);
    if (!media) return false;

    if (imageUrls.length > 0) {
      media.image_urls.push(...imageUrls);
    }
    if (videoUrls.length > 0) {
      media.video_urls.push(...videoUrls);
    }
    return true;
  }
}

// Singleton
module.exports = new ProductStore();
