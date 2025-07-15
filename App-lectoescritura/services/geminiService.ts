import { LessonPlanRequest, LessonPlan } from "../types";

// ¡IMPORTANTE! Esta es la URL directa a tu backend.
const BACKEND_URL = 'https://applectoescritura-backend-702516870563.europe-west1.run.app/generate-plan';

export const generateLessonPlan = async (request: LessonPlanRequest): Promise<LessonPlan> => {
  try {
    // La solicitud ahora va directamente a la URL del backend.
    const response = await fetch(BACKEND_URL, {
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