import { LessonPlanRequest, LessonPlan } from "../types";

/**
 * Llama al endpoint del backend para generar un plan de clase.
 * El frontend no conoce la clave de API ni el prompt; solo envía la solicitud 
 * a su propio servidor y espera una respuesta.
 * @param request - Un objeto con la edad, número de sesiones y objetivo.
 * @returns Una promesa que se resuelve con el plan de clase generado.
 */
export const generateLessonPlan = async (request: LessonPlanRequest): Promise<LessonPlan> => {
  try {
    // La solicitud ahora va a tu propio backend, a través de la ruta del proxy.
    const response = await fetch('/api/generate-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        message: `El servidor respondió con un error ${response.status}.` 
      }));
      throw new Error(errorData.message || 'Ocurrió un error en el servidor.');
    }

    const lessonPlanData: LessonPlan = await response.json();
    return lessonPlanData;

  } catch (error) {
    console.error("Error al generar el plan de clase:", error);
    if (error instanceof Error) {
        throw new Error(`Error en el servicio: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al comunicarse con el servidor.");
  }
};