import { Args, Command, Flags } from '@oclif/core'
import { getDatabase } from '../../controllers/database.js'
import { getProduct, removeProduct } from "../../controllers/product.js"
import { confirm, log } from '@clack/prompts'

export default class RemoveProduct extends Command {
  static override args = {
    product: Args.string({ required: true, description: 'the product to remove (is upper insensitive)' }),
  }

  static override description = 'Remove an especified product stored in database'

  static override examples = [
    '<%= config.bin %> <%= command.id %> chesse',
    '<%= config.bin %> <%= command.id %> carrot --force',
  ]

  static override flags = {
    force: Flags.boolean({ char: 'f' }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(RemoveProduct);

    const productName = args.product;
    const db = await getDatabase();
    const product = await getProduct(productName);
    
    if (!product) {
      return log.error(`Product \"${productName.toLowerCase()}\" not found`);
    }
    if (!flags.force) {
      log.warn(`This operation is dangerous, we will permanently remove the \"${product.name}\" product in the \"${product.section}\" section?`);
      if (!await confirm({ message: 'Are you sure you want to remove this product?' })) {
        return log.info("Operation cancelled");
      }
    }

    await removeProduct(productName);
    await db.write();
    log.success("Yeah! Product removed successfully");
  }
}
