import { Args, Command, Flags } from '@oclif/core'
import { getDatabase, getProducts, removeSection } from '../../controllers/database.js'
import { confirm, log } from '@clack/prompts'
import { parseWord } from '../../utils/parse.js'

export default class RemoveSection extends Command {
  static override args = {
    section: Args.string({ required: true, description: 'the products section to remove' }),
  }

  static override description = 'Remove a group of products in the especified section stored in database'

  static override examples = [
    '<%= config.bin %> <%= command.id %> fruits',
    '<%= config.bin %> <%= command.id %> vegetables --force',
  ]

  static override flags = {
    force: Flags.boolean({ char: 'f' }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(RemoveSection);

    const sectionName = parseWord(args.section);
    const db = await getDatabase();
    const products = await getProducts(sectionName);
    
    if (!products.length) {
      return log.error(`Products in \"${sectionName}\" section not found`);
    }
    if (!flags.force) {
      log.warn(`This operation is dangerous, we will permanently remove ${products.length} products stored in the \"${sectionName}\" section`);
      if (!await confirm({ message: 'Are you sure you want to remove the section?' })) {
        return log.info("Operation cancelled");
      }
    }

    await removeSection(sectionName);
    await db.write();
    log.success("Yeah! Products removed");
  }
}
