// App.js
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import ImageUploader from './ImageUploader'; // 先に作成したImageUploaderコンポーネントをインポート

const App = () => {
    const [image, setImage] = useState(null);
    const [extractedText, setExtractedText] = useState("");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
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
            setExtractedText(text); // 抽出したテキストを状態に保存
        });
    };

    const handleCameraCapture = () => {
        // カメラ機能の実装
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>SnapSched</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            <button onClick={handleCameraCapture}>カメラで撮影</button>
            {image && <img src={image} alt="Uploaded" style={{ marginTop: "20px", maxWidth: "300px" }} />}
            {extractedText && (
                <div style={{ marginTop: "20px", textAlign: "left" }}>
                    <h2>抽出されたテキスト:</h2>
                    <p>{extractedText}</p>
                </div>
            )}
        </div>
    );
};

export default App;
