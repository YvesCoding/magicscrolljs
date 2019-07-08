export function ping(callback: (arg0: any) => void) {
  // eslint-disable-next-line
  const url =
    'https://private-a' +
    'lipay' +
    'objects.alip' +
    'ay.com/alip' +
    'ay-rmsdeploy-image/rmsportal/RKuAiriJqrUhyqW.png';
  const img = new Image();
  let done: boolean;
  const finish = (status: string) => {
    if (!done) {
      done = true;
      img.src = '';
      callback(status);
    }
  };
  img.onload = () => finish('responded');
  img.onerror = () => finish('error');
  img.src = url;
  return setTimeout(() => finish('timeout'), 1500);
}

export function isLocalStorageNameSupported() {
  const testKey = 'test';
  const storage = window.localStorage;
  try {
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function getCurrentLoacle(locales: any, slug: string) {
  if (!locales) return false;

  let targetLocale = '/';

  for (let path in locales) {
    if (path != targetLocale && slug.startsWith(path)) {
      targetLocale = path;
    }
  }

  return Object.keys(locales).length > 1 && targetLocale;
}

export function getCurrentWebConfigBySlug(webConfig: any, slug: string) {
  const locales = webConfig.themeConfig.locales;
  const targetLocale = getCurrentLoacle(locales, slug);
  if (!targetLocale) return webConfig;

  return {
    ...webConfig,
    ...webConfig.locales[targetLocale],
    themeConfig: {
      ...webConfig.themeConfig,
      ...webConfig.themeConfig.locales[targetLocale],
    },
  };
}
