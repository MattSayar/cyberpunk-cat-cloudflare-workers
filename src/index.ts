export default {
  async fetch(request, env) {
    const inputs = {
      prompt: "cyberpunk cat in a rainy neon city",
    };

    try {
      const imageResponse = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs,
      );
      
      // Return HTML with the image as a separate request
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body, html {
                margin: 0;
                padding: 0;
                height: 100%;
                width: 100%;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            </style>
          </head>
          <body>
            <img src="/image" alt="Cyberpunk cat" />
          </body>
        </html>
      `;
      
      // Check if this is a request for the image
      const url = new URL(request.url);
      if (url.pathname === '/image') {
        return new Response(imageResponse, {
          headers: {
            "content-type": "image/png",
          },
        });
      }
      
      // Otherwise return the HTML
      return new Response(html, {
        headers: {
          "content-type": "text/html",
        },
      });
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
} satisfies ExportedHandler<Env>;