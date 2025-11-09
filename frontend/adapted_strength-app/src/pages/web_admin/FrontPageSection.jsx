import { useState, useEffect } from 'react';
import { WebAdminApi } from '../../api/WebAdminApi';

export default function FrontPageSection() {
  const [content, setContent] = useState({
    heroTitle: '',
    heroSubtitle: '',
    heroImageUrl: '',
    ctaButtonText: '',
    ctaButtonLink: '',
    sections: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    WebAdminApi.getHomePageContent()
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setMessage('Error loading content');
        setLoading(false);
      });
  }, []);

  const handleChange = (field, value) => {
    setContent({ ...content, [field]: value });
  };

  const handleSectionChange = (index, field, value) => {
    const newSections = [...content.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setContent({ ...content, sections: newSections });
  };

  const moveSectionUp = (index) => {
    if (index === 0) return;
    const newSections = [...content.sections];
    [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    newSections.forEach((section, i) => {
      section.displayOrder = i;
    });
    setContent({ ...content, sections: newSections });
  };

  const moveSectionDown = (index) => {
    if (index === content.sections.length - 1) return;
    const newSections = [...content.sections];
    [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    newSections.forEach((section, i) => {
      section.displayOrder = i;
    });
    setContent({ ...content, sections: newSections });
  };

  const handleSave = () => {
    setSaving(true);
    setMessage('');
    WebAdminApi.updateHomePageContent(content)
      .then(() => {
        setMessage('✓ Saved successfully');
        setSaving(false);
      })
      .catch((error) => {
        console.error(error);
        setMessage('✗ Error saving content');
        setSaving(false);
      });
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl">
      <h2 className="text-2xl font-bold mb-6">Front Page Content</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('✓') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-xl font-semibold mb-4">Hero Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hero Title</label>
              <input
                type="text"
                value={content.heroTitle || ''}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Hero Subtitle</label>
              <input
                type="text"
                value={content.heroSubtitle || ''}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Hero Image URL</label>
              <input
                type="text"
                value={content.heroImageUrl || ''}
                onChange={(e) => handleChange('heroImageUrl', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CTA Button Text</label>
              <input
                type="text"
                value={content.ctaButtonText || ''}
                onChange={(e) => handleChange('ctaButtonText', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">CTA Button Link</label>
              <input
                type="text"
                value={content.ctaButtonLink || ''}
                onChange={(e) => handleChange('ctaButtonLink', e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Page Sections</h3>
          
          {content.sections && content.sections.length > 0 ? (
            content.sections.map((section, index) => (
              <div key={section.id || index} className="border p-4 mb-4 rounded">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold">{section.sectionKey || `Section ${index + 1}`}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => moveSectionUp(index)}
                      disabled={index === 0}
                      className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveSectionDown(index)}
                      disabled={index === content.sections.length - 1}
                      className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                      ↓
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={section.visible !== false}
                        onChange={(e) => handleSectionChange(index, 'visible', e.target.checked)}
                      />
                      <span className="text-sm font-medium">Visible</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={section.title || ''}
                      onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                  </div>

                  {section.sectionType === 'simple' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Content</label>
                      <textarea
                        value={section.content || ''}
                        onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  )}

                  {section.sectionType === 'testimonials' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Testimonials (JSON)</label>
                      <p className="text-xs text-gray-500 mb-1">Format: [{"{"}quote, author{"}"}, ...]</p>
                      <textarea
                        value={section.data || ''}
                        onChange={(e) => handleSectionChange(index, 'data', e.target.value)}
                        rows="5"
                        className="w-full px-3 py-2 border rounded font-mono text-sm"
                      />
                    </div>
                  )}

                  {section.sectionType === 'sports' && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Sports Cards (JSON)</label>
                      <p className="text-xs text-gray-500 mb-1">Format: [{"{"}title, description, image{"}"}, ...]</p>
                      <textarea
                        value={section.data || ''}
                        onChange={(e) => handleSectionChange(index, 'data', e.target.value)}
                        rows="8"
                        className="w-full px-3 py-2 border rounded font-mono text-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No sections available. Sections will be created when you add content to the home page.</p>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
