import axios from 'axios';
import cheerio from 'cheerio';

export const scrapeWebContent = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Remove script and style elements
    $('script, style').remove();
    
    // Get the text content
    const text = $('body').text();
    
    // Clean up whitespace
    return text.replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.error('Error scraping web content:', error);
    throw error;
  }
};