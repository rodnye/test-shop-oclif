import { Args, Command, Flags } from '@oclif/core'
import { getDatabase } from '../controllers/database.js'
import { addProduct } from "../controllers/product.js"
import { log, text } from '@clack/prompts'
import { parseWord } from '../utils/parse.js'
import { validateProductName, validateProductPrice, validateSectionName } from '../validations/product.js'

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
        validate: validateProductName,
      });
      if(typeof symbol != "string") this.exit();
      product.name = parseWord(symbol);
    } 
    else {
      let invalid = validateProductName(
        product.name = parseWord(args.product)
      );
      if (invalid) return log.error(invalid);
    }
    
    // verify section
    if (!flags.section) {
      let symbol = await text({
        message: `Insert product section for \"${product.name}\"`,
        placeholder: "fruits",
        validate: validateSectionName,
      });
      if(typeof symbol != "string") this.exit();
      product.section = parseWord(symbol);
    } 
    else {
      let invalid = validateSectionName(
        product.section = parseWord(flags.section)
      );
      if (invalid) return log.error(invalid);
    }
    
    // verify price
    if (!flags.price) {
      let symbol = await text({
        message: `Insert the price of \"${product.name}\"`,
        placeholder: "73",
        validate: validateProductPrice,
      });
      if(typeof symbol != "string") this.exit();
      product.price = parseInt(symbol);

    } 
    else {
      let invalid = validateProductPrice(
        (product.price = flags.price) + ""
      )
      if (invalid) return log.error(invalid);
    }

    await addProduct(product);
    await db.write();
    log.success(`Product ${product.name} added!`);
  }
}
