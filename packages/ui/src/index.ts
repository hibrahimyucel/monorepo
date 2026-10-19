export const renderButton = (text: string): string => {
  return `<button class="saas-btn" style="padding: 10px 20px; background: #0070f3; color: white; border: none; border-radius: 5px; cursor: pointer;">${text}</button>`;
};

export const renderCard = (title: string, content: string): string => {
  return `<div class="saas-card" style="border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
    <h3 style="margin-top: 0; color: #333;">${title}</h3>
    <p style="color: #666;">${content}</p>
  </div>`;
};
