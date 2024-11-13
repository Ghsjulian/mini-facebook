import React, { useState } from "react";
import axios from "axios";

const ImageUploader = () => {
    const [coverFile, setCoverFile] = useState(null);
    const [profileFile, setProfileFile] = useState(null);

    const handleCoverChange = event => {
        const file = event.target.files[0];
        if (file) {
            setCoverFile(file);
        }
    };

    const handleProfileChange = event => {
        const file = event.target.files[0];
        if (file) {
            setProfileFile(file);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData();
        if (coverFile) {
            formData.append("cover", coverFile); // Append cover file
        }
        if (profileFile) {
            formData.append("profile", profileFile); // Append profile file
        }

        try {
            const response = await axios.post("your_api_endpoint", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log("Upload successful:", response.data);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Upload Images</h2>
            <div>
                <label htmlFor="cover-upload">Cover Image:</label>
                <input
                    type="file"
                    id="cover-upload"
                    accept="image/*"
                    onChange={handleCoverChange}
                />
            </div>
            <div>
                <label htmlFor="profile-upload">Profile Image:</label>
                <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    onChange={handleProfileChange}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ImageUploader;
