import {
	loginWithAuthToken,
	loginWithPassword,
} from "@evex/linejs";
import { FileStorage } from "@evex/linejs/storage";

async function main() {
	// === 初回のみ: メールログイン ===
	const client = await loginWithPassword({
		email: "jhgncptv.416@gmail.com",
		password: "nowfyg-9sopba-Sexzac",
		onPincodeRequest(pin) {
			console.log("PIN:", pin);
		},
	}, {
		device: "DESKTOPWIN",
		storage: new FileStorage("./storage.json"),
	});

	// AuthTokenを取得して保存
	client.base.on("update:authtoken", (authtoken) => {
		console.log("AuthToken:", authtoken);
		// ここでファイルなどに保存しておく
	});

	// 現在のAuthTokenを表示
	// console.log("\n★★★ 現在のAuthToken ★★★");
	// console.log(client.authToken);
	// console.log("★★★★★★★★★★★★★★★★★★★★★\n");

	// 既読イベントをリッスン
	client.on("event", async (event) => {
		if (event.type === "NOTIFIED_READ_MESSAGE") {
			const userMid = event.param2;
            console.log("=== 既読通知 ===");
            console.log(`既読したユーザーMID: ${userMid}`);
            console.log(`チャットMID: ${event.param1}`);
            console.log(`メッセージID: ${event.param3}`);
		}
	});

	// メッセージも受信する場合
	client.on("message", async (message) => {
		console.log(`\n[メッセージ] ${message.text}`);
	});

	client.listen({ talk: true });
}

main();