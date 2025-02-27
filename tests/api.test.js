require("dotenv").config();

const axios = require("axios");

const API_URL = process.env.API_URL;
const idInstance = process.env.idInstance;
const apiTokenInstance = process.env.apiTokenInstance;
const chatId = `${process.env.receiver}@c.us`;
const data = {
  chatId: chatId,
  message: "Test message",
};

console.log(data);
describe("API tests", () => {
  test("Положительное тестирование отправки сообщения", async () => {
    const response = await axios.post(
      `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
      {
        chatId: chatId,
        message: "Test message",
      }
    );

    expect(response.status).toBe(200);
  }, 10000);

  test("Отправка сообщения с неправильным chatId", async () => {
    try {
      const response = await axios.post(
        `${API_URL}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
        {
          chatId: chatId,
          message: "Test message",
        }
      );
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Получение последних 5 сообщений", async () => {
    const response = await axios.post(
      `${API_URL}/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`,
      {
        chatId: chatId,
        count: 5,
      }
    );

    expect(response.status).toBe(200);
  });
});
