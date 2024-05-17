export const sideBarData = [
  {
    routeLink: 'add-job',
    icon: 'fal fa-id-card',
    label: 'Add New Job',
    requiredPrivilege: true,
    requiredSpecialPrivilege: false,
  },
  {
    routeLink: 'interview',
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
  // {
  //     routeLink: 'sml',
  //     icon: 'fal fa-camera',
  //     label: 'Social Profiles'
  // },
  // {
  //     routeLink: 'pass-reset',
  //     icon: 'fal fa-cog',
  //     label: 'Password Reset'
  // },
];
