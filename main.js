client.base.on("update:authtoken", (authtoken) => {
	console.log("AuthToken", authtoken);
});