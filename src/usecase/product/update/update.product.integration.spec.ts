import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product = ProductFactory.create("Fraldas", 100);

const input = {
  id: product.id,
  name: "Fraldas Updated",
  price: 200
};
const output = {
  id: product.id,
  name: "Fraldas Updated",
  price: 200
};


describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const usecase = new UpdateProductUseCase(productRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
