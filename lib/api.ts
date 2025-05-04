import axios from "axios";

const CLOUD_FUNCTION_URL = "https://us-central1-market-house-8fcb3.cloudfunctions.net/calculateReturns";

export async function submitInvestmentData(data: Record<string, any>) {
    try {
        const response = await axios.post(CLOUD_FUNCTION_URL, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("API error:", error);
        return { success: false, error };
    }
}
