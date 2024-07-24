const natsWrapper = {
    client: {
        publish: jest.fn().mockImplementation((subject, data, callback) => {
            callback();
        }),
    },
};

export { natsWrapper };
