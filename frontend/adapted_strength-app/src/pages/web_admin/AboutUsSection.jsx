import { useState, useEffect } from 'react';
import { WebAdminApi } from '../../api/WebAdminApi';

export default function AboutUsSection() {
  const [content, setContent] = useState({
    founderName: '',
    founderTitle: '',
    founderBio: '',
    missionStatement: '',
    qualifications: '',
    contactEmail: '',
    contactPhone: '',
    locationAddress: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    WebAdminApi.getAboutUsContent()
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

  const handleSave = () => {
    setSaving(true);
    setMessage('');
    WebAdminApi.updateAboutUsContent(content)
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
      <h2 className="text-2xl font-bold mb-6">About Us Content</h2>
      
      {message && (
        <div className={`mb-4 p-3 rounded ${message.includes('✓') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Founder Name</label>
          <input
            type="text"
            value={content.founderName || ''}
            onChange={(e) => handleChange('founderName', e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Founder Title</label>
          <input
            type="text"
            value={content.founderTitle || ''}
            onChange={(e) => handleChange('founderTitle', e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Founder Image URL</label>
          <input
            type="text"
            value={content.founderImageUrl || ''}
            onChange={(e) => handleChange('founderImageUrl', e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://..."
          />
          {content.founderImageUrl && (
            <img src={content.founderImageUrl} alt="Preview" className="mt-2 max-w-xs rounded border" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Founder Bio</label>
          <textarea
            value={content.founderBio || ''}
            onChange={(e) => handleChange('founderBio', e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mission Image URL</label>
          <input
            type="text"
            value={content.missionImageUrl || ''}
            onChange={(e) => handleChange('missionImageUrl', e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://..."
          />
          {content.missionImageUrl && (
            <img src={content.missionImageUrl} alt="Preview" className="mt-2 max-w-xs rounded border" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Mission Statement</label>
          <p className="text-xs text-gray-500 mb-1">Supports markdown: **bold**, *italic*, - lists</p>
          <textarea
            value={content.missionStatement || ''}
            onChange={(e) => handleChange('missionStatement', e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Qualifications</label>
          <p className="text-xs text-gray-500 mb-1">Supports markdown: **bold**, *italic*, - lists</p>
          <textarea
            value={content.qualifications || ''}
            onChange={(e) => handleChange('qualifications', e.target.value)}
            rows="4"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Extra Image URL</label>
          <input
            type="text"
            value={content.extraImageUrl || ''}
            onChange={(e) => handleChange('extraImageUrl', e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="https://..."
          />
          {content.extraImageUrl && (
            <img src={content.extraImageUrl} alt="Preview" className="mt-2 max-w-xs rounded border" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Extra Section Content</label>
          <p className="text-xs text-gray-500 mb-1">Optional text for the third section</p>
          <textarea
            value={content.extraSectionContent || ''}
            onChange={(e) => handleChange('extraSectionContent', e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Email</label>
          <input
            type="email"
            value={content.contactEmail || ''}
            onChange={(e) => handleChange('contactEmail', e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contact Phone</label>
          <input
            type="tel"
            value={content.contactPhone || ''}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location Address</label>
          <input
            type="text"
            value={content.locationAddress || ''}
            onChange={(e) => handleChange('locationAddress', e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
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
