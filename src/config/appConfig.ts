export const Config = {
  uiMasterData: {
    brandName: "Cheat Sheet",
    brandTagLine: "a platform for developers to share their knowledge",
    brandLogo: "/img/brand-logo.png",
    googleLogo: "/img/google_g_logo.svg",

    profile: {
      examSectionTitle: "Rescent Exam Results",
    },
  },
  developer: {
    name: "Dileepa Samarawickrama",
    email: "dnsam.mit@gmail.com",
    test: "test",
  },

  routePaths: {
    auth: "/auth",
    admin: "/admin",
  },

  colors: {
    getBg: (fg: string)=> {
      if(!fg || fg==="rgb(255, 255, 255)") return "none"
      return fg.replace("rgb", "rgba").replace(")", ", 0.24)");
    },
    primary: "rgb(76, 175, 80)",
    secondary: "rgb(76, 175, 80)",
    success: "rgb(76, 175, 80)",
    warning: "rgb(255, 193, 7)",

    laravel: "rgb(255, 96, 0)",
    git: "rgb(125, 0, 255)",
    typeScript: "rgb(0, 132, 255)",
    react: "rgb(3, 169, 244)",
    redux: "rgb(103, 58, 183)",
    docker: "rgb(142, 209, 252)",
    nginx: "rgb(76, 175, 80)",
    linux: "rgb(255, 195, 0)",
    
    apache: "rgb(76, 175, 80)",
    php: "rgb(76, 175, 80)",
    mysql: "rgb(76, 175, 80)",
    mongo: "rgb(76, 175, 80)",
    node: "rgb(76, 175, 80)",
    express: "rgb(76, 175, 80)",

    error: "rgb(255, 0, 0)",
    info: "rgb(76, 175, 80)",

    white: "rgb(255, 255, 255)",
    black: "rgb(0, 0, 0)",
    dark: "rgb(0, 0, 0)",
    border: "rgb(76, 175, 80)",

    gold: "rgb(201, 171, 129)",
  },

  uiMeasurements: {
    sidebarWidth: "300px",
    navBarPrimeHeight: "90px",
  }
};


