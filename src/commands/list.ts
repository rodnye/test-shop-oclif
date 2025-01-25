import { Command, Flags } from '@oclif/core'
import { getDatabase } from '../controllers/database.js';
import { intro, log, outro } from '@clack/prompts';

export default class List extends Command {
  static override description = 'Get all section list'
  static override aliases = ["l:ls"]

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --length',
  ]

  static override flags = {
    length: Flags.boolean({ char: 'l' }),
  }

  public async run() {
    const { flags } = await this.parse(List);

    const db = await getDatabase();
    const sectionsMap = {};

    for (const product of db.data.products) {
      if (sectionsMap[product.section]) {
        sectionsMap[product.section]++;
      }
      else {
        sectionsMap[product.section] = 1;
      }
    }
    intro("List of sections:");
    if (!Object.keys(sectionsMap).length) return log.warn("The database is empty.")
    for (const section in sectionsMap) {
      log.info(`> ${section}: ${flags.length ? sectionsMap[section] + " products" : "<"}\n`);
    }
    outro();
  }
}
