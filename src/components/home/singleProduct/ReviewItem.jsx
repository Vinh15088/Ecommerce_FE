import React from 'react';

const ReviewItem = ({ review }) => {
    const timeAgo = (dateString) => {
        try {
            const normalizedString = dateString.replace(/\.\+\d{2}:\d{2}/, "Z");
            const date = new Date(normalizedString);
    
            if (isNaN(date)) return "Invalid Date";
    
            const now = new Date();
            const diff = now - date; 
    
            const seconds = Math.floor(diff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const months = Math.floor(days / 30);
            const years = Math.floor(days / 365);
    
            if (years > 0) return `${years} years ago`;
            if (months > 0) return `${months} months ago`;
            if (days > 0) return `${days} days ago`;
            if (hours > 0) return `${hours} hours ago`;
            if (minutes > 0) return `${minutes} minutes ago`;
            return "Vừa xong";
        } catch (error) {
            return "Invalid Date";
        }
    };
    return (
        <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
                <span className="font-bold text-blue-500">{review.user.username}</span>
                <span className="ml-2 text-sm text-gray-500">{timeAgo(review.createdAt)}</span>
            </div>
            <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                    <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`w-4 h-4 ${index < review.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    >
                        <path
                            fill="currentColor"
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                    </svg>
                ))}
            </div>
            <p className="text-gray-700">{review.comment}</p>
        </div>
    );
};

export default ReviewItem;