// 新しいワーカーを作成し、"generate.js" にあるコードを与えます。
const worker = new Worker("./generate.js");

// ユーザーが［素数の生成］をクリックしたら、ワーカーにメッセージを送ります。
// メッセージのコマンドは "generate" であり、メッセージには生成する素数の
// 数である "quota" も含まれています。
document.querySelector("#generate").addEventListener("click", () => {
  const quota = document.querySelector("#quota").value;
  worker.postMessage({
    command: "generate",
    quota,
  });
});

// ワーカーがメインスレッドにメッセージを送り返したら、メッセージ
// データから受け取った生成された素数の個数を含むユーザーへの
// メッセージで出力ボックスを更新します。
worker.addEventListener("message", (message) => {
  document.querySelector("#output").textContent =
    `${message.data} 個の素数を生成しました。`;
});

document.querySelector("#reload").addEventListener("click", () => {
  document.querySelector("#user-input").value =
    "［素数の生成］を押した後、すぐにここに入力してみてください。";
  document.location.reload();
});
