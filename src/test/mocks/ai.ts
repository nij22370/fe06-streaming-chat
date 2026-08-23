/// <reference types="vitest/globals" />

// Mock for useChat hook from ai/react
export const mockUseChat = {
  messages: [],
  input: '',
  handleInputChange: vi.fn(),
  handleSubmit: vi.fn(),
  isLoading: false,
  stop: vi.fn(),
  setMessages: vi.fn(),
  reload: vi.fn(),
  error: undefined,
  setInput: vi.fn(),
}

vi.mock('ai/react', () => ({
  useChat: vi.fn(() => mockUseChat),
}))
