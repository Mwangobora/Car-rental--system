import React, { Fragment, useState, useEffect } from 'react';

const Reviews = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    // Fetch all feedbacks
    const getFeedbacks = async () => {
        try {
            const response = await fetch('http://localhost:5000/feedbacks', {
                method: 'GET',
            });
            const responseData = await response.json(); // Parse JSON response
            setFeedbacks(responseData); // Update state with feedbacks
        } catch (err) {
            console.error('Error fetching feedbacks:', err.message);
        }
    };

    // Delete a specific feedback
    const deleteFeedback = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/feedbacks/${id}`, {
                method: 'DELETE',
            });
            if (response.status === 200) {
                // Update feedbacks state after successful deletion
                setFeedbacks(feedbacks.filter((feedback) => feedback.feedback_id !== id));
            } else {
                console.error('Failed to delete feedback');
            }
        } catch (err) {
            console.error('Error deleting feedback:', err.message);
        }
    };

    // Fetch feedbacks on component load
    useEffect(() => {
        getFeedbacks();
    }, []);

    return (
        <Fragment>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-6">User Reviews</h1>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Feedback</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedbacks.length > 0 ? (
                                feedbacks.map((feedback) => (
                                    <tr key={feedback.feedback_id} className="text-center hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-2">{feedback.feedback_id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{feedback.feedback}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button
                                                onClick={() => deleteFeedback(feedback.feedback_id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border border-gray-300 px-4 py-2 text-center">
                                        No reviews available.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    );
};

export default Reviews;
