import * as THREE from "three";

export const textTexture = (text: string) => {
    // Canvasを作成
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
        return;
    }

    // Canvasのサイズ設定
    canvas.width = 32; // 2のべき乗推奨
    canvas.height = 32;

    // 背景を塗りつぶす
    context.fillStyle = "white"; // 背景色
    context.fillRect(0, 0, canvas.width, canvas.height);

    // テキストを描画
    context.fillStyle = "black"; // テキスト色
    context.font = "12px Arial"; // フォントサイズと種類
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    // CanvasからThree.jsのテクスチャを作成
    return new THREE.CanvasTexture(canvas);
};