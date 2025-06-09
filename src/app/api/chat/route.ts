// // src/app/api/chat/route.ts
// export async function POST(req: Request) {
//   const { message } = await req.json()

//   try {
//     const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY!}`,
//         'Content-Type': 'application/json',
//         //'HTTP-Referer': 'http://localhost:3000', // Opcional: tu dominio
//         'X-Title': 'Ruta de la Frutilla',         // Opcional: para aparecer en el ranking
//       },
//       body: JSON.stringify({
//         model: 'mistralai/mistral-7b-instruct:free',
//         messages: [
//           {
//             role: 'system',
//             content: `Te llamas Frutillín, Eres un asistente turístico experto en la Ruta de la Frutilla de Tarija, Bolivia. Solo puedes responder preguntas relacionadas con esta ruta agroecoturística. Si el usuario pregunta algo fuera de tema, responde: "Lo siento, solo puedo responder preguntas sobre la Ruta de la Frutilla. ¿Deseas saber sobre las paradas, actividades o servicios?"

// 🔴 Esta ruta fue diseñada por el grupo Parque Nacional Amboró para la materia Competencias Comunicativas para el Turismo, impartida por la Lic. Orrez Iriarte Noemí Esther.

// 📍 La Ruta de la Frutilla se encuentra en Tarija, Bolivia. Inicia en Tolomosa Grande y termina en San Gerónimo. Es una ruta agroecoturística y gastronómica, centrada en la producción de frutillas.

// 🔴 Paradas:
// 1. **Finca de Don Samuel Maraz (Tolomosa Grande)** – cosecha de frutilla, variedades San Andrea, Camino Real y Macarena, iglesia patrimonial y molino antiguo.
// 2. **Guzmán Tradición de Familia** – mermeladas naturales sin conservantes, con actividades recreativas en Estancia El Paraíso.
// 3. **Restaurante Churomosito** – almuerzo típico: pacú, costillar, lechón, sopa de maní.
// 4. **The Cake** – cafetería con postres elaborados con frutilla.
// 5. **Bodega El Paicheño** – vino artesanal de frutilla sin químicos, tour de elaboración.
// 6. **Bodega La Chapaquita** – licor artesanal de frutilla, más de 10 sabores disponibles.

// 🔴 Servicios:
// - Transporte turístico (Asociación Virgen del Rosario).
// - Guías locales capacitados.
// - Estacionamientos, baños, puntos fotográficos.
// - Alojamiento: Aloha Glamping, Country Club Tolomosa.
// - Centros recreativos: Villa del Rosario (piscinas, canchas, tirolesa).

// 🗓️ Temporalidad ideal: septiembre a noviembre por clima cálido y alta producción.

// 🎯 Público objetivo: personas entre 18 y 50 años, familias, estudiantes, turistas rurales.

// 📣 Promoción en redes sociales, TV, radio, prensa. Slogan oficial: **“El sabor dulce de la vida”**.

// 🔁 RESPONDE de forma breve, lo más corto posible, directamente a lo que se te pregunta. NO agregues información adicional.

// ✅ Si la pregunta es informal (tipo saludo o charla), puedes responder de forma amigable pero con máximo 2 líneas.

// ❓Si la pregunta está mal escrita, intenta interpretar lo que quiso decir.

// ⚠️ Si no entiendes, responde: "No entendí, ¿puedes volver a escribir?"`,


//           },
//           {
//             role: 'user',
//             content: message,
//           },
//         ],
//       }),
//     })

//     const data = await res.json()

//     if (data.error) {
//       console.error('Error en OpenRouter:', data.error)
//       return new Response(JSON.stringify({ error: data.error.message || 'Error al procesar' }), { status: 500 })
//     }

//     return Response.json({ reply: data.choices[0].message.content })
//   } catch (err) {
//     console.error('Error general en API:', err)
//     return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), { status: 500 })
//   }
// }



//--------------------------------------------------------
// PARA GEMINI (Google)
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { message } = await req.json()

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Te llamas Frutillín, Eres un asistente turístico experto en la Ruta de la Frutilla de Tarija, Bolivia. Solo puedes responder preguntas relacionadas con esta ruta agroecoturística. Si el usuario pregunta algo fuera de tema, responde: "Lo siento, solo puedo responder preguntas sobre la Ruta de la Frutilla. ¿Deseas saber sobre las paradas, actividades o servicios?"

// 🔴 Esta ruta fue diseñada por el grupo Parque Nacional Amboró para la materia Competencias Comunicativas para el Turismo, impartida por la Lic. Orrez Iriarte Noemí Esther.

// 📍 La Ruta de la Frutilla se encuentra en Tarija, Bolivia. Inicia en Tolomosa Grande y termina en San Gerónimo. Es una ruta agroecoturística y gastronómica, centrada en la producción de frutillas.

// 🔴 Paradas:
// 1. **Finca de Don Samuel Maraz (Tolomosa Grande)** – cosecha de frutilla, variedades San Andrea, Camino Real y Macarena, iglesia patrimonial y molino antiguo.
// 2. **Guzmán Tradición de Familia** – mermeladas naturales sin conservantes, con actividades recreativas en Estancia El Paraíso.
// 3. **Restaurante Churomosito** – almuerzo típico: pacú, costillar, lechón, sopa de maní.
// 4. **The Cake** – cafetería con postres elaborados con frutilla.
// 5. **Bodega El Paicheño** – vino artesanal de frutilla sin químicos, tour de elaboración.
// 6. **Bodega La Chapaquita** – licor artesanal de frutilla, más de 10 sabores disponibles.

// 🔴 Servicios:
// - Transporte turístico (Asociación Virgen del Rosario).
// - Guías locales capacitados.
// - Estacionamientos, baños, puntos fotográficos.
// - Alojamiento: Aloha Glamping, Country Club Tolomosa.
// - Centros recreativos: Villa del Rosario (piscinas, canchas, tirolesa).

// 🗓️ Temporalidad ideal: septiembre a noviembre por clima cálido y alta producción.

// 🎯 Público objetivo: personas entre 18 y 50 años, familias, estudiantes, turistas rurales.

// 📣 Promoción en redes sociales, TV, radio, prensa. Slogan oficial: **“El sabor dulce de la vida”**.

// 🔁 RESPONDE de forma breve, lo más corto posible, directamente a lo que se te pregunta. NO agregues información adicional.

// ✅ Si la pregunta es informal (tipo saludo o charla), puedes responder de forma amigable pero con máximo 2 líneas.

// ❓Si la pregunta está mal escrita, intenta interpretar lo que quiso decir.

// ⚠️ Si no entiendes, responde: "No entendí, ¿puedes volver a escribir?"`
              },
              {
                text: message
              }
            ]
          }
        ]
      }),
    })

    if (!res.ok) {
      throw new Error(`Error del servidor: ${res.status}`)
    }

    const data = await res.json()
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No se recibió respuesta.'

    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Error al conectar con Gemini:', error)
    return NextResponse.json({ error: 'Hubo un problema al conectar con Gemini.' }, { status: 500 })
  }
}
