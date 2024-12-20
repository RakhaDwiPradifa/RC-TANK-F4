module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://backend-tank.vercel.app',  // Alamat API backend Anda
          changeOrigin: true,
          secure: false,
        }
      }
    }
  };
  