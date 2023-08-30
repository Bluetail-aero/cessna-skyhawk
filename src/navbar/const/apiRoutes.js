export const apiRoutes = [
  {
    text: 'List Aircraft',
    route: '/listAircraft',
  }, {
    text: 'List Aircraft Folders',
    route: '/listAircraftFolders',
  }, {
    text: 'Create Aircraft Folder',
    route: '/createAircraftFolder',
  }, {
    text: 'List Office Folders',
    route: '/listOfficeFolders',
  }, {
    text: 'Request Upload',
    route: '/requestUpload',
  }, {
    text: 'Finalize Upload',
    route: '/finalizeUpload',
  }
];

export const getRouteTextByPathname = (currentUrl) => {
  const matchingRoute = apiRoutes.find((route) => route.route === currentUrl);
  return matchingRoute ? matchingRoute.text : '';
};
