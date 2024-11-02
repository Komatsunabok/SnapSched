// ImageUploader.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const ImageUploader = ({ onTextExtracted }) => {
    const [imageSrc, setImageSrc] = useState(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
                performOCR(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const performOCR = (imageSrc) => {
        Tesseract.recognize(
            imageSrc,
            'jpn',
            {
                logger: info => console.log(info)
            }
        ).then(({ data: { text } }) => {
            console.log(text);
            onTextExtracted(text); // 親コンポーネントにテキストを渡す
        });
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            {imageSrc && <img src={imageSrc} alt="Uploaded" style={{ marginTop: "20px", maxWidth: "300px" }} />}
        </div>
    );
};

export default ImageUploader;
