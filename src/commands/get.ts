import { Args, Command, Flags } from '@oclif/core'
import { connectDatabase } from '../controllers/database.js'
import { getProducts, getSectionsNames } from "../controllers/product.js"
import { intro, log, outro, select, selectKey } from '@clack/prompts'
import { parseWord } from '../utils/parse.js'

export default class Get extends Command {
  static override args = {
    section: Args.string({ description: 'Section to show products' }),
  }

  static override description = 'Show the products stored in the specified section'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> vegetables',
    '<%= config.bin %> <%= command.id %> fruits --total',
  ]

  static override flags = {
    total: Flags.boolean({ char: 't', description: 'Show total price number of products' }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Get);

    let sectionName:string;
    await connectDatabase();
    
    if (!args.section) {
      let sections = await getSectionsNames();
      if (!sections.length) return log.error("Database is empty");

      sectionName = await select({
        message: "Select a section to show:",
        options: sections.map(section => ({value: section}))
      })
    }  
    else sectionName = parseWord(args.section);
    
    const products = await getProducts(sectionName);
    
    let total = 0;
    if (products.length === 0) {
      return log.error(`${sectionName} section not exists`);
    }

    log.info(`Section ${sectionName}`);
    for (const product of products) {
      total += product.price;
      this.log(`- ${product.name} - ${product.price}€`);
    }
    if (flags.total) {
      outro(`Total: ${total}€`);
    }
    else outro();
  }
}
