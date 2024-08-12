// routesConfig.js
const routesConfig = {
    dashboard: '/dashboard',
    recruitment: {
      root: '/recruitement',
      tabs : {
      interviews: '/recruitement/interviews',
      schedule: '/recruitement/schedule',
      settings: '/recruitement/settings',
      },
      menu : {
        interviews:{
        recent : '/recruitement/interviews/recent',
        questions : '/recruitement/interviews/questions',
        },
        schedule:{
            list: '/recruitement/schedule/list',
            kanbanBoard : '/recruitement/schedule/board'
        }
      }
    },
    teamMembers: '/team-members',
    meetings: {
      root: '/meetings',
      tabs : {
      meetings: '/meetings/meetings',
      settings: '/meetings/settings',
      },
      menu : {
        meetings: {
            recent:'/meetings/meetings/recent',
            schedule:'/meetings/meetings/schedule'}
      }

    },
    evaluation: '/evaluation',
  };
  
  export default routesConfig;
  