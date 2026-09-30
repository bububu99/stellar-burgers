describe("Теститорание страницы конструктора бургера", () => {
  beforeEach(() => {
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as("getUser");
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("createOrder");

    window.localStorage.setItem("refreshToken", "test-refresh-token");
    cy.setCookie("accessToken", "test-access-token");
    cy.viewport(1400, 1000);
    cy.visit("/");
    cy.wait("@getIngredients");

    cy.get('[data-cy=buns-ingredients]').as('bunsIngredients');
    cy.get('[data-cy=mains-ingredients]').as('mainsIngredients');
    cy.get('[data-cy=sauces-ingredients]').as('saucesIngredients');
    cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe("Тест добавления ингредиентов в бургер", () => {
    it("Добавление булки", () => {
      cy.get('@bunsIngredients')
        .contains('Булка 1')
        .parents('[data-cy=ingredient]')
        .find('button')
        .click();
      cy.get('[data-cy=constructor-bun-top]')
        .contains('Булка 1')
        .should('exist');
      cy.get('[data-cy=constructor-bun-bot]')
        .contains('Булка 1')
        .should('exist');
    })

    it('Добавление начинки и соуса', () => {
    cy.get('@mainsIngredients')
      .contains('Начинка 1')
      .parents('[data-cy=ingredient]')
      .find('button')
      .click();
    cy.get('@saucesIngredients')
      .contains('Соус 1')
      .parents('[data-cy=ingredient]')
      .find('button')
      .click();

    cy.get('@constructorIngredients')
      .contains('Начинка 1')
      .should('exist');
    cy.get('@constructorIngredients')
      .contains('Соус 1')
      .should('exist');
  });
  })

  describe("Тест работы модального окна ингредиента", () => {
    it("Модальное окно открывается", () => {
      cy.contains('Булка 2').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=modal]').contains('Булка 2').should('exist');
    });

    it('Модальное окно закрывается по клику на крестик', () => {
    cy.contains('Булка 2').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=button-close-modal]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('Модальное окно закрывается по клику на оверлей', () => {
    cy.contains('Соус 3').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=overlay]').click('right', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
  })

  describe('Тест создания заказа', () => {
    beforeEach(() => {
      cy.get('@bunsIngredients')
        .contains('Булка 1')
        .parents('[data-cy=ingredient]')
        .find('button')
        .click();

      cy.get('@mainsIngredients')
        .contains('Начинка 1')
        .parents('[data-cy=ingredient]')
        .find('button')
        .click();

      cy.get('@saucesIngredients')
        .contains('Соус 1')
        .parents('[data-cy=ingredient]')
        .find('button')
        .click();
    });

    it('Модальное окно открывается с правильным номером заказа', () => {
      cy.get('[data-cy=order-button]').click();
      cy.wait('@createOrder');
      
      cy.get('[data-cy=modal]')
        .contains('12345')
        .should('exist');
      
    });
  
    it('Модальное окно закрывается, конструктор бургера очищается', () => {
      cy.get('[data-cy=order-button]').click();
      cy.wait('@createOrder');
      
      cy.get('[data-cy=button-close-modal]').click();
      cy.get('[data-cy=modal]').should('not.exist');
      
      cy.get('@constructorIngredients')
        .contains('Булка 1')
        .should('not.exist');
      cy.get('@constructorIngredients')
        .contains('Начинка 1')
        .should('not.exist');
      cy.get('@constructorIngredients')
        .contains('Соус 1')
        .should('not.exist');
    });

})
  
});