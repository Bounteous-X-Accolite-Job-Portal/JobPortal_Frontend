export const sideBarData = [
  {
    routeLink: 'add-job',
    icon: 'fal fa-id-card',
    label: 'Add New Job',
    requiredPrivilege: true,
    requiredSpecialPrivilege: false,
  },
  {
    routeLink: 'add-employee',
    icon: 'fa fa-user-plus',
    label: 'Add New Employee',
  },
  {
    routeLink: 'interview/:applicationId',
    icon: 'fal fa-question',
    label: 'Inteview Hub',
    requiredPrivilege: false,
    requiredSpecialPrivilege: false,
  },
  {
    routeLink: 'interview-hub',
    icon: 'fa-solid fa-users',
    label: 'Interview Feedback',
    requiredPrivilege: false,
    requiredSpecialPrivilege: false,
  },
  {
      routeLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings',
      requiredPrivilege: true,
      requiredSpecialPrivilege: true,
  },
  {
    routeLink: 'your-jobs',
    icon: 'fa-solid fa-briefcase',
    label: 'Your Jobs',
    requiredPrivilege: false,
    requiredSpecialPrivilege: false,
  },

  // {
  //     routeLink: 'pass-reset',
  //     icon: 'fal fa-cog',
  //     label: 'Password Reset'
  // },
];
