import classNames from 'classnames/bind';
import styles from './AdminPage.module.scss';
import DefaultButton from '@/components/Common/Buttons/DefaultButton';
import { Certificate } from 'crypto';
import fetchData from '@/api/fetchData';

const mockCertificateData = {
  name: '최유정',
  generation: 3,
  certificateImage: '/이미지url',
};

interface mockCertificateDataType {
  name: string;
  generation: number;
  certificateImage: string;
}

export default function CertificateTable({
  name,
  generation,
  certificateImage,
}: mockCertificateDataType) {
  const cn = classNames.bind(styles);

  // TableRow.tsx
  interface TableRowProps {
    children: React.ReactNode;
  }
  const TableRow: React.FC<TableRowProps> = ({ children }) => {
    return <div className={cn('list')}>{children}</div>;
  };

  // TableCell.tsx
  interface TableCellProps {
    children: React.ReactNode;
  }
  const TableCell: React.FC<TableCellProps> = ({ children }) => {
    return <div className={cn('cell')}>{children}</div>;
  };

  // 승인 또는 거절 동작 로직 대강~~
  const sendAcceptRequest = async () => {
    const response = await fetchData({
      param: `/admin`,
      method: 'patch',
      requestData: {
        status: 'accepted',
      },
      // header에 여기도 cookie를 넣어야하나..?
    });
    return response;
  };

  const sendRejectRequest = async () => {
    const response = await fetchData({
      param: `/admin`,
      method: 'patch',
      requestData: {
        status: 'rejected',
      },
      // header에 여기도 cookie를 넣어야하나..?
    });
    return response;
  };

  const handleClickAccept = () => {
    sendAcceptRequest();
    console.log('승인함');
  };
  const handleClickReject = () => {
    sendRejectRequest();
    console.log('거절함');
  };

  // status 뱃지 분리하기
  const statusBadge = (status: string | undefined) => {
    switch (status) {
      case 'accepted':
        return '승인 완료';
      case 'rejected':
        return '거절됨';
      default:
        return (
          <div className={cn('button-container')}>
            <DefaultButton
              size="small"
              color="$white-01"
              onClick={handleClickAccept}
            >
              수락하기
            </DefaultButton>
            <DefaultButton
              size="small"
              color="$red-01"
              onClick={handleClickReject}
            >
              거절하기
            </DefaultButton>
          </div>
        );
    }
  };

  return (
    <>
      <div className={cn('title')}>가입 승인 목록</div>
      <div className={cn('wrapper')}>
        <TableRow>
          <TableCell>{mockCertificateData.name}</TableCell>
          <TableCell>{mockCertificateData.generation}</TableCell>
          <TableCell>{mockCertificateData.certificateImage}</TableCell>
          <TableCell>{statusBadge('pending')}</TableCell>
        </TableRow>
      </div>
    </>
  );
}
