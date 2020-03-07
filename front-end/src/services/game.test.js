import Game from "./game";
import moxios from "moxios";

const mockData = {
  status: 200,
  response: [
    {
      id: 1,
      title: "My First Album",
      board: "_________"
    }
  ]
};

describe("Game Service Layer", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("Should call get service", async () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith(mockData);
    });

    const game = new Game();
    const response = await game.getAll();
    expect(response[0].id).toBe(1);
    expect(response[0].board).toBe("_________");
  });

  it("Should call getById with an ID", async () => {
    moxios.stubRequest("/games/1", {
      status: 200,
      response: { id: 1, title: "game 1" }
    });

    const game = new Game();
    const response = await game.getById(1);
    expect(response.id).toBe(1);
    expect(response.title).toBe("game 1");
  });
});
