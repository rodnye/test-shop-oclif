import { Command, Flags } from '@oclif/core'
import { getDatabase } from '../controllers/database.js';
import { intro, log, outro } from '@clack/prompts';

export default class List extends Command {
  static override description = 'Get all section list'
  static override aliases = ["ls"]

  public async run() {

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
      log.info(`> ${section}: ${sectionsMap[section] + " products"}`);
    }
    
    outro("Total of products: " + db.data.products.length);
  }
}
