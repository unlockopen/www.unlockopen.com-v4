export const getLinkActiveState = (itemUrl, pageUrl) => {
  let response = '';

  if (itemUrl === pageUrl) {
    response = ' aria-current="page"';
  }

  if (itemUrl.length > 1 && pageUrl.indexOf(itemUrl.replace('/page-0/', '')) === 0) {
    response += 'data-state="active"';
  }

  return response;
};

export const filterCollectionByKeys = (collection, keys) => {
  return collection.filter(x => keys.includes(x.data.key));
};

export const random = () => {
  const segment = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return `${segment()}-${segment()}-${segment()}`;
};
