const { decideWinner, STATE } = require("./utils.js");

describe("Decide Winner", () => {
  it("should declare O as won if we pass o_xxx_ooo on board", () => {
    expect(decideWinner("o_xxx_ooo")).toMatchObject([
      STATE.O_WON,
      ["6", "7", "8"]
    ]);
  });

  it("should declare X as won if we pass o_xxx_ooo on board", () => {
    expect(decideWinner("o_xo_xxox")).toMatchObject([
      STATE.X_WON,
      ["2", "5", "8"]
    ]);
  });

  it("should declare DRAW as won if we pass xoxxoooxx on board", () => {
    expect(decideWinner("xoxxoooxx")).toMatchObject([
      STATE.DRAW,
      ""
    ]);
  });

  it("should return RUNNING if we pass o___x_o__ on board", () => {
    expect(decideWinner("o___x_o__")).toMatchObject([
      STATE.RUNNING,
      ""
    ]);
  });

  it("should return error status if pass wrong string", () => {
    expect(decideWinner("__2123---")).toMatchObject([
      STATE.ERROR,
      "INVALID_BOARD"
    ]);
  });
});
