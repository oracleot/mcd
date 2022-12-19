import * as React from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import ChatOnly from '../svgs/chat-only.svg';
import ChatBg from '../svgs/chat-bg.svg';
import ChatLeft from '../svgs/chat-left.svg';
import ChatRight from '../svgs/chat-right.svg';

export default function Templates() {
  const match = useRouteMatch();
  const history = useHistory();

  const handleTemplateSelect = (e) => {
    history.push(`${match.url}/${e.currentTarget.value}/setup`);
  };

  return (
    <div className="container">
      <Link className="nav-link" to="/">
        &#8592; Back home
      </Link>
      <h1 className="title">1. Choose Layout</h1>
      <h3 className="sub-title">
        Select the template that matches your desired layout
      </h3>
      <div className="templates">
        <div className="template">
          <img src={ChatOnly} width="100%" alt="Chat Only Template" />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="chat-only">Chat Only</label>
            <input
              id="chat-only"
              name="template"
              value="chat-only"
              type="radio"
              onChange={handleTemplateSelect}
            />
          </div>
        </div>
        <div className="template">
          <img
            src={ChatBg}
            width="100%"
            alt="Chat with content (background) Template"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="chat-content-background">
              Chat with content (background)
            </label>
            <input
              id="chat-content-background"
              name="template"
              value="chat-content-background"
              type="radio"
              onChange={handleTemplateSelect}
            />
          </div>
        </div>
        <div className="template">
          <img
            src={ChatLeft}
            width="100%"
            alt="Chat with content (left) Template"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="chat-content-left">Chat with content (left)</label>
            <input
              id="chat-content-left"
              name="template"
              value="chat-content-left"
              type="radio"
              onChange={handleTemplateSelect}
            />
          </div>
        </div>
        <div className="template">
          <img
            src={ChatRight}
            width="100%"
            alt="Chat with content (right) Template"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <label htmlFor="chat-content-right">
              Chat with content (right)
            </label>
            <input
              id="chat-content-right"
              name="template"
              value="chat-content-right"
              type="radio"
              onChange={handleTemplateSelect}
            />
          </div>
        </div>
      </div>
      <div className="templates"></div>
    </div>
  );
}
