const get = (params) => {
  return `org_${params.user.organizations.id}_${params.user.organizations.uuid}`.replace(/-/g, '');
};

module.exports = {
  get
};
