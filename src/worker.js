onmessage = e => {
    console.log('worker> got message',e);
    const message = e.data;
    console.log(`[From Main]: ${message}`);
    postMessage('Processed !')
};
