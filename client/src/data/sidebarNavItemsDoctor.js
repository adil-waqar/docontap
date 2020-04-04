export default [
  {
    title: 'DocOnTap Dashboard',
    to: '/overview',
    htmlBefore: '<i class="material-icons">edit</i>',
    htmlAfter: ''
  },
  {
    title: 'Appointments',
    htmlBefore: '<i class="material-icons">healing</i>',
    to: '/doctor-appointments'
  },
  {
    title: 'Upcoming Appointments',
    htmlBefore: '<i class="material-icons">calendar_today</i>',
    to: '/upcoming-appointments'
  },
  {
    title: 'Done Appointments',
    htmlBefore: '<i class="material-icons">local_hospital</i>',
    to: '/completed-appointments'
  },
  {
    title: 'Conditions Library',
    htmlBefore: '<i class="material-icons">search</i>',
    to: '/conditions-library'
  }
];
