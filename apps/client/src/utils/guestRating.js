export const getGuestRatingDisplay = (score) => {
    if (score >= 90) {
        return {
            text: "Outstanding",
            bgColor: "bg-emerald-100",
            textColor: "text-emerald-800",
            borderColor: "border-emerald-200"
        };
    }
    else if (score >= 80) {
        return {
            text: "Excellent",
            bgColor: "bg-blue-100",
            textColor: "text-blue-800",
            borderColor: "border-blue-200"
        };
    }
    else if (score >= 70) {
        return {
            text: "Very Good",
            bgColor: "bg-indigo-100",
            textColor: "text-indigo-800",
            borderColor: "border-indigo-200"
        };
    }
    else if (score >= 60) {
        return {
            text: "Good",
            bgColor: "bg-gray-100",
            textColor: "text-gray-700",
            borderColor: "border-gray-200"
        };
    }
    return null; // will not display for scores below 60
};
