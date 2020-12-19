module.exports = {
  exclude:[
    __dirname+'/**.json',
  ],
  plugins: [
    "@snowpack/plugin-sass",
    "@snowpack/plugin-postcss"
  ],
  installOptions:{
    treeshake:true
  },
  buildOptions:{
    // baseUrl: "/static/",
    // watch: true,
    // out: ".",
    // clean: true
  },
  devOptions: {
    // open: 'none',
    port: 9000
  },
}
