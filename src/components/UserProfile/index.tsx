import { FaMapMarkerAlt, FaTwitter, FaLink, FaBuilding } from 'react-icons/fa'
import type { GitHubUser } from '../../types'

type Props = { user: GitHubUser | null }

export default function UserProfile({ user }: Props) {
  if (!user) {
    return (
      <div className='h-96 w-full rounded-2xl bg-secondary-bg flex items-center justify-center'>
        <p className='text-preset-4 text-primary-text/70'>
          Search for a GitHub user above
        </p>
      </div>
    )
  }

  const joined = new Date(user.created_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div className='h-max w-full rounded-2xl bg-secondary-bg p-8 space-y-6'>
      <div className='flex items-start gap-6'>
        <img
          src={user.avatar_url}
          alt={`${user.name || user.login} avatar`}
          className='w-24 h-24 rounded-full'
        />
        <div className='flex-1'>
          <div className='w-full flex justify-between items-center mb-0.5'>
            <h3 className='text-preset-1 text-primary-text'>
              {user.name || user.login}
            </h3>
            <p className='text-preset-6 text-primary-text'>Joined {joined}</p>
          </div>
          <p className='text-preset-4 text-[var(--blue-300)]'>@{user.login}</p>
        </div>
      </div>

      <p className='text-preset-4 text-primary-text/60'>
        {user.bio || 'This profile has no bio'}
      </p>

      <div className='grid grid-cols-3 text-center bg-primary-bg rounded-lg p-6 gap-4'>
        <div>
          <p className='text-preset-4 text-secondary-text'>Repos</p>
          <p className='text-preset-6 font-bold text-primary-text'>{user.public_repos}</p>
        </div>
        <div>
          <p className='text-preset-4 text-secondary-text'>Followers</p>
          <p className='text-preset-6 font-bold text-primary-text'>{user.followers}</p>
        </div>
        <div>
          <p className='text-preset-4 text-secondary-text'>Following</p>
          <p className='text-preset-6 font-bold text-primary-text'>{user.following}</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 text-preset-4'>
        <div className='flex items-center gap-3'>
          <FaMapMarkerAlt className={`text-tertiary-text${!user.location && '/60'}`} />
          <span className={`text-primary-text${!user.location && '/60'}`}>{user.location || 'Not Available'}</span>
        </div>
        <div className='flex items-center gap-3'>
          <FaTwitter className={`text-tertiary-text${!user.twitter_username && '/60'}`} />
          <span className={`text-primary-text${!user.twitter_username && '/60'}`}>
            {user.twitter_username ? `@${user.twitter_username}` : 'Not Available'}
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <FaLink className={`text-tertiary-text${!user.blog && '/60'}`} />
          <a
            href={user.blog || undefined}
            target='_blank'
            rel='noopener noreferrer'
            className={`${
              user.blog ? 'text-primary-text hover:underline' : 'text-primary-text/60'
            }`}
          >
            {user.blog || 'Not Available'}
          </a>
        </div>
        <div className='flex items-center gap-3'>
          <FaBuilding className={`text-tertiary-text${!user.company && '/60'}`} />
          <span className={`text-primary-text${!user.company && '/60'}`}>{user.company || 'Not Available'}</span>
        </div>
      </div>
    </div>
  )
}
