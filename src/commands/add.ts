import { Args, Command, Flags } from '@oclif/core'
import { addProduct, getDatabase } from '../controllers/database.js'
import { log, text } from '@clack/prompts'
import { parseWord } from '../utils/parse.js'

export default class Add extends Command {
  static override args = {
    product: Args.string({ description: 'Product name' }),
  }

  static override description = 'Add a product to the database'

  static override examples = [
    '<%= config.bin %> <%= command.id %> chesse --price 30 --section a',
    '<%= config.bin %> <%= command.id %> "pineapple" --price 130 --section fruits',
  ]

  static override flags = {
    price: Flags.integer({ char: 'p', description: 'Price of the product' }),
    section: Flags.string({ char: 's', description: 'Section to be stored the product' }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Add);

    const db = await getDatabase();
    const product:Product = {
      name:"", 
      section:"",
      price:0,
    };
    
    // verify product name
    if (!args.product) {
      let symbol = await text({
        message: "Insert the name of product",
        placeholder: "apple",
        validate: (input) => {
          if(input.length < 3 || input.length > 20) {
            return new Error("Ups! The product name must be between 3 and 20 characters.");
          }
        }
      });
      if(typeof symbol != "string") this.exit();
      product.name = parseWord(symbol);
    
    } else product.name = parseWord(args.product);
    
    // verify section
    if (!flags.section) {
      let symbol = await text({
        message: `Insert product section for \"${product.name}\"`,
        placeholder: "fruits",
        validate: (input) => {
          if(input.length < 3 || input.length > 20) {
            return new Error("Ups! The section name must be between 3 and 20 characters.");
          }
        }
      });
      if(typeof symbol != "string") this.exit();
      product.section = parseWord(symbol);
    } else product.section = parseWord(flags.section);
    
    // verify price
    if (!flags.price) {
      let symbol = await text({
        message: `Insert the price of \"${product.name}\"`,
        placeholder: "73",
        validate: (input) => {
          let int = parseInt(input);
          if (isNaN(int)) {
            return new Error("Ups! Must be a number");
          }
          if (int < 0) return new Error("Ups! The price must be a positive number.");
        }
      });
      if(typeof symbol != "string") this.exit();
      product.price = parseInt(symbol);

    } else product.price = flags.price;

    await addProduct(product);
    await db.write();
    log.success(`Product ${product.name} added!`);
  }
}
