export function shouldShowAds(host: string) {
  const hideHosts = [
    "miaodaily.com",
    "www.miaodaily.com",
  ];

  return !hideHosts.includes(host);
}