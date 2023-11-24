const brace = (content, type = 'curly') => {
  const [opening, closing] = {
    curly: ['{{', '}}'],
    silent: ['{%-', '-%}']
  }[type];
  return `${opening}${content}${closing}`;
};

module.exports = brace;
