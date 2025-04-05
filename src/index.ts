export default {
  async fetch(request, env) {
    const inputs = {
      prompt: "cyberpunk cat in a rainy neon city",
    };

    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );
    
    // Convert the binary response to base64
    const arrayBuffer = await response.arrayBuffer();
    const base64 = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );
    
    // Return HTML with a responsive image
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              width: 100%;
              overflow: hidden;
            }
            img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
          </style>
        </head>
        <body>
          <img src="data:image/png;base64,${base64}" alt="Cyberpunk cat" />
        </body>
      </html>
    `, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
} satisfies ExportedHandler<Env>;