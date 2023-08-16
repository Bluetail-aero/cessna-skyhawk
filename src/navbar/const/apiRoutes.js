export const apiRoutes = [
  {
    text: 'Finalize Upload',
    route: '/finalizeUpload',
  }, {
    text: 'List Aircraft Folders',
    route: '/listAircraftFolders',
  }, {
    text: 'List Office Folders',
    route: '/listOfficeFolders',
  }, {
    text: 'Request Upload',
    route: '/requestUpload',
  }
];

export const getRouteTextByPathname = (currentUrl) => {
  const matchingRoute = apiRoutes.find((route) => route.route === currentUrl);
  return matchingRoute ? matchingRoute.text : '';
};
